const menuItems = {
    vegBiryani: [
        {
            name: "Vegetable Biryani",
            description: "A flavorful mix of fresh vegetables, aromatic rice, and authentic spices",
            price: 199,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/veg-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 25,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Mixed Vegetables", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Paneer Biryani",
            description: "Rich and creamy paneer cubes cooked with fragrant rice and spices",
            price: 249,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/paneer-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 30,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Paneer", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Mushroom Biryani",
            description: "Aromatic biryani with fresh mushrooms and special spice blend",
            price: 229,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/mushroom-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 25,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Mushrooms", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Soya Chunk Biryani",
            description: "Protein-rich soya chunks cooked with aromatic rice and spices",
            price: 219,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/soya-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 25,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Soya Chunks", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Sweet Corn Biryani",
            description: "Unique biryani preparation with sweet corn kernels and mild spices",
            price: 209,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/corn-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "mild",
            isVegetarian: true,
            preparationTime: 25,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Sweet Corn", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Cauliflower Biryani",
            description: "Fresh cauliflower florets cooked with aromatic rice and spices",
            price: 199,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/cauliflower-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 25,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Cauliflower", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Hyderabadi Veg Dum Biryani",
            description: "Traditional Hyderabadi style vegetable dum biryani",
            price: 259,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/hyd-veg-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "spicy",
            isVegetarian: true,
            preparationTime: 35,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Mixed Vegetables", "Hyderabadi Spices", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Palak Biryani",
            description: "Healthy spinach based biryani with aromatic spices",
            price: 229,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/palak-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 30,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Spinach", "Biryani Masala", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Coconut Milk Biryani",
            description: "Unique biryani cooked in coconut milk for rich creamy flavor",
            price: 269,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/coconut-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "mild",
            isVegetarian: true,
            preparationTime: 35,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Coconut Milk", "Mixed Vegetables", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Zafrani Veg Biryani",
            description: "Luxurious saffron-flavored vegetable biryani",
            price: 299,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/zafrani-biryani.jpg",
            category: "Veg Biryani",
            spiceLevel: "medium",
            isVegetarian: true,
            preparationTime: 40,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Mixed Vegetables", "Saffron", "Ghee", "Mint Leaves", "Special Spices"]
        }
    ],
    nonVegBiryani: [
        {
            name: "Hyderabadi Chicken Dum Biryani",
            description: "Authentic Hyderabadi style chicken biryani slow-cooked in dum",
            price: 299,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/hyd-chicken-biryani.jpg",
            category: "Non-Veg Biryani",
            spiceLevel: "spicy",
            isVegetarian: false,
            preparationTime: 40,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Chicken", "Hyderabadi Spices", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Andhra Special Chicken Biryani",
            description: "Spicy Andhra style chicken biryani with authentic flavors",
            price: 289,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/andhra-chicken-biryani.jpg",
            category: "Non-Veg Biryani",
            spiceLevel: "extra_spicy",
            isVegetarian: false,
            preparationTime: 35,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Chicken", "Andhra Spices", "Saffron", "Ghee", "Curry Leaves"]
        },
        {
            name: "Gongura Chicken Biryani",
            description: "Unique biryani with tangy gongura leaves and chicken",
            price: 309,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/gongura-chicken-biryani.jpg",
            category: "Non-Veg Biryani",
            spiceLevel: "spicy",
            isVegetarian: false,
            preparationTime: 45,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Chicken", "Gongura Leaves", "Spices", "Ghee", "Mint Leaves"]
        }
    ],
    regionalBiryani: [
        {
            name: "Nellore Chicken Biryani",
            description: "Famous Nellore style chicken biryani with unique spice blend",
            price: 289,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/nellore-biryani.jpg",
            category: "Regional Biryani",
            spiceLevel: "spicy",
            isVegetarian: false,
            preparationTime: 45,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Chicken", "Nellore Spices", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Vijayawada Special Biryani",
            description: "Authentic Vijayawada style biryani with rich flavors",
            price: 299,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/vijayawada-biryani.jpg",
            category: "Regional Biryani",
            spiceLevel: "extra_spicy",
            isVegetarian: false,
            preparationTime: 40,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Meat", "Vijayawada Spices", "Saffron", "Ghee", "Mint Leaves"]
        },
        {
            name: "Rayalaseema Spicy Biryani",
            description: "Extra spicy Rayalaseema style biryani",
            price: 319,
            image: "https://res.cloudinary.com/biryani-junction/image/upload/v1/menu/rayalaseema-biryani.jpg",
            category: "Regional Biryani",
            spiceLevel: "extra_spicy",
            isVegetarian: false,
            preparationTime: 45,
            servingSize: "Serves 1",
            ingredients: ["Basmati Rice", "Meat", "Rayalaseema Spices", "Saffron", "Ghee", "Curry Leaves"]
        }
    ]
};

module.exports = menuItems;
