const MenuModel = require('../models/menu');

// get menus
const getAllMenus = async ( req: any, res: any) => {
    const AllMenus = await MenuModel.find({});
    res.status(200).json(AllMenus);
};

// add menu
const addMenu = async (req: any, res: any) => {
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

// update menu by id 
const updateMenuById = async (req: any, res: any) => {    
    const { id } = req.params;
    const menu = await MenuModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    !menu ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data updated for: ${menu.name}`})
};

// delete menu by id
const deleteMenuById = async (req: any, res: any) => {    
    const { id } = req.params;
    const menu = await MenuModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    !menu ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data updated for: ${menu.name}`});
};

export {
    getAllMenus,
    addMenu,
    getMenuById,
    updateMenuById,
    deleteMenuById
}