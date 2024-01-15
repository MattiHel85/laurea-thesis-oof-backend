const MenuModel = require('../models/menu');

// get menus
const GetAllMenus = async ( req: any, res: any) => {
    const AllMenus = await MenuModel.find({});
    res.status(200).json(AllMenus);
};

// add menu
const AddMenu = async (req: any, res: any) => {
    const {name, description, menuItems } = req.body;
    try {
        const newMenu = new MenuModel({
            name,
            description,
            menuItems
        });
        await newMenu.save();

        return res.status(200).json({message: `Menu with name "${newMenu.name} successfully added"`});
    } catch (err) {
        return res.status(500).json({ err: `${res.message}, bro!`})
    }
}

// fetch menu by id
const getMenuById = async (req: any, res: any) => {
    const { id } = req.params;
    const menu = await MenuModel.findById(id);
    !menu ? 
    res.status(500).json({ error: 'Menu not found'}) :
    res.status(200).json(menu);

}

// update users by id 
const updateMenuById = async (req: any, res: any) => {    
    const { id } = req.params;
    const menu = await MenuModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${menu.name}`);
};

// delete user by id
const deleteMenuById = async (req: any, res: any) => {    
    const { id } = req.params;
    const menu = await MenuModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted user: ${menu.name}`);
};

export {
    GetAllMenus,
    AddMenu,
    getMenuById,
    updateMenuById,
    deleteMenuById
}