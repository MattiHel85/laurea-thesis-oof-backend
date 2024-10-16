import mongoose from 'mongoose';
import { getAllMenus, addMenu, getMenuById, updateMenuById, deleteMenuById } from '../src/controllers/menuControllers';
import { MenuModel } from '../src/models/menu';
import dotenv from 'dotenv';

dotenv.config();

interface mockRequestBody {
    name: string;
    description: string;
    menuItems: Array<{
        name: string;
        price: number;
        description: string;
    }>;
};

// Mock request and response objects
const mockRequest = (body: mockRequestBody = {name: '', description: '', menuItems: []}, params = {}) => ({
    body,
    params
});

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Menu Controller', () => {
    let menuId: string;

    const mongoPass = process.env.MONGO_PASS || 'QG26uJQnUAZL1n2G';
    const uri = `mongodb+srv://mattrcsimpson:${mongoPass}@cluster0.6lvmky3.mongodb.net/?retryWrites=true&w=majority`;

    beforeEach(async () => {
        await mongoose.connect(uri);

        mongoose.connection.on("error", (err: Error) => console.log(`Connection Error: ${err}`));
        mongoose.connection.once("open", () => console.log("Welcome to the OOF database!"));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should create a new menu', async () => {
        const req = mockRequest({
            name: 'Dinner Menu',
            description: 'A variety of dinner options',
            menuItems: [
                { name: 'Steak', price: 18, description: 'A juicy steak' },
                { name: 'Salad', price: 17, description: 'A healthy salad' }
            ]
        });
        const res = mockResponse();

        await addMenu(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: `Menu with name "${req.body.name}" successfully added` }));
        
        const createdMenu = await MenuModel.findOne({ name: req.body.name });
        createdMenu ? menuId = createdMenu._id.toString() : null;
    }, 50000);

    test('should get all menus', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await getAllMenus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    }, 50000);

    test('should get a menu by ID', async () => {
        const req = mockRequest({name: '', description: '', menuItems: []}, { id: menuId });
        const res = mockResponse();

        await getMenuById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        const expectedMenu = await MenuModel.findById(menuId);
        expectedMenu ? expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: expectedMenu.name })) : null;
    }, 50000);

    test('should update a menu by ID', async () => {
        const req = mockRequest({
            name: 'Updated Lunch Menu',
            description: 'Updated description',
            menuItems: [
                { name: 'Burger1', price: 10, description: 'A juicy burger' },
                { name: 'Pasta1', price: 12, description: 'Delicious pasta' }
            ]
        }, { id: menuId });
        const res = mockResponse();

        await updateMenuById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: `Data updated for: ${req.body.name}` }));
    }, 50000);

    test('should delete a menu by ID', async () => {
        const req = mockRequest({name: '', description: '', menuItems: []},{ id: menuId });
        const res = mockResponse();

        await deleteMenuById(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    }, 50000);
});
