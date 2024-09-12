import { Request, Response } from 'express';
import { hash } from "bcryptjs";
import { sendResetPasswordEmail } from "../utils/nodemailer";
import { UserDetailsService, StorageService, ImageManager } from "../services/index";
interface UserDetails {
    Imagen: string;
}
class UserDetailsController {
    protected userDetailsService: UserDetailsService;
    protected storageService: StorageService;
    protected imageManagerService: ImageManager;
    constructor(
        userDetailsService: UserDetailsService,
        storageService: StorageService,
        imageManagerService: ImageManager
    ) {
        this.userDetailsService = userDetailsService;
        this.storageService = storageService;
        this.imageManagerService = imageManagerService;
    }

    getUserDetails = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
    
        try {
            const results = await this.userDetailsService.getUserDetailsById(id);
    
            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const user = results[0] as UserDetails;
            const imageUrl = user.Imagen;
            const userWithImage = { ...user, imageUrl };
    
            res.status(200).json({ userWithImage });
    
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    updateUserDetails = async (req: Request, res: Response) => {

        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        const formData = JSON.parse(req.body.data);
        const { Nombre, Apellido, Apellido2, correo, Telefono, direccion } = formData;
        const image = this.imageManagerService.manageImage(req);
        const fileNamePath = req.file?.path ?? null;
        try {
            if (fileNamePath) {
                const oldImage = await this.userDetailsService.getUserOldImage(id);
                this.storageService.deleteFileFromFirebase(oldImage[0].Imagen, 'avatar');
            }

            const result = await this.userDetailsService.updateUserDetails(id, Nombre, Apellido, Apellido2, correo, Telefono, direccion, image);
            if (!result) {
                return res.status(500).json({ error: 'Error while updating in the database' });
            }

            res.status(200).json({ message: 'User details updated successfully' });
        } catch (error) {
            console.log(error);
            this.storageService.deleteFileFromFirebase(image, 'avatar');
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    savePhone = async (req: Request, res: Response) => {
        const phone = req.body.phone;
        const id = req.body.id;
        try {
            const verifyIfExist = await this.userDetailsService.getUserPhoneById(id);
            if (verifyIfExist.length > 0) {
                return res.status(401).json({ error: 'This user already has a phone number' });
            }

            const result = await this.userDetailsService.savePhone(phone, id);
            if (!result) {
                return res.status(500).json({ error: 'Failed while inserting into database' });
            }

            res.status(200).json({ message: 'Phone number inserted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    updateUserPhone = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const { phone } = req.body;
        try {

            const result = await this.userDetailsService.updatePhone(id, phone);
            if (!result) {
                return res.status(500).json({ error: 'Error while updating in the database' });
            }
            res.status(200).json({ message: 'Phone number updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    saveAddress = async (req: Request, res: Response) => {
        const { address } = req.body;
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        try {
            const verifyIfExist = await this.userDetailsService.getUserAddressById(id);
            if (verifyIfExist.length > 0) {
                return res.status(401).json({ error: 'This user already has an address' });
            }

            const results = await this.userDetailsService.saveAddress(id, address);
            if (!results) {
                return res.status(500).json({ error: 'Failed while inserting into database' });
            }

            res.status(200).json({ message: 'Address inserted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    updateUserAddress = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        const { address } = req.body;
        try {
            const results = await this.userDetailsService.updateAddress(id, address);
            if (!results) {
                return res.status(500).json({ error: 'Error updating the address in the database' });
            }

            res.status(200).json({ message: 'Address updated successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    sendPasswodEmailChange = async (req: Request, res: Response) => {
        const host = req.headers.host ? req.headers.host : 'localhost';
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = req.user;
        try {
            const verifyEmail = await sendResetPasswordEmail(user, host);
            if (!verifyEmail) {
                return res.status(500).json({ error: 'Failed to send password reset email' });
            }

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    updateUserPassword = async (req: Request, res: Response) => {

        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const { password } = req.body;
        try {
            const hashedPassword = await hash(password, 10);
            const results = await this.userDetailsService.updatePassword(id, hashedPassword);
            if (!results) {
                return res.status(500).json({ error: 'Error inserting into database' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
         const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.userDetailsService.deleteAccount(id);
            if (!result) {
                return res.status(500).json({ error: 'Error while deleting from the database' });
            }
            res.status(200).json({ message: 'Your account has been deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}
export default UserDetailsController;