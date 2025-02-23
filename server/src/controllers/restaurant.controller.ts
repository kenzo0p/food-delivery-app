import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";
export const createRestaurant = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } =
      req.body;
    const file = req.file;
    // console.log(file ,restaurantName, );
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exist for this user",
      });
    }
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    // console.log(imageUrl);
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });
    return res.status(201).json({ success: true, message: "Restaurant Added" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Interval server error", success: false });
  }
};
export const getRestaurant = async (req: Request, res: Response): Promise<any> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, restaurant:[],message: "Restaurant not found" });
    }
    return res.status(200).json({ restaurant, success: true });
  } catch (error) {
    console.log("Error while getting the restaurant", error);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

export const updateRestaurant = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Resaturant not found", success: false });
    }
    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.cuisines = cuisines;
    restaurant.deliveryTime = deliveryTime;
    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    return res.status(201).json({
      success: true,
      message: "Restaurant updated successfaully",
      restaurant,
    });
  } catch (error) {
    console.log(error, "Error while updating restaurant");
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getRestaurantOrder  = async (req: Request, res: Response) :Promise<any> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found", success: false });
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user"); //jitna usko milega wo sab return karega
    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found", success: false });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error while getting the resto orders", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const updatedOrderStatus = async (req: Request, res: Response) :Promise<any> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById({ orderId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order are not found", success: false });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error, "Error while updating status of order");
    return res
      .status(500)
      .json({ message: "Internal server error", succcess: false });
  }
};
export const searchRestaurant = async (req: Request, res: Response) :Promise<any> => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);
    const query: any = {};
    // basic search based on searchText(name , city , country)
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } }, // i means if its uppercase or lowercase doesnat matter
        { country: { $regex: searchText, $options: "i" } },
      ];
    }
    // filter based on the basis of searchQuery
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { cuisines: { $regex: searchText, $options: "i" } }, // i means if its uppercase or lowercase doesnat matter
      ];
    }
    // console.log(query);
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }
    const restaurant = await Restaurant.find(query);
    return res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log("Error while searching the restaurant", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getSingleRestaurant = async (req: Request, res: Response) :Promise<any> => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findOne({ restaurantId }).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Resatauran not found" });
    }
    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log(error, "Error while getting the single Retaurant");
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
