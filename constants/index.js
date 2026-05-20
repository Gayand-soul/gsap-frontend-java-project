

const navLinks = [
        { id: 'suites', title: 'Suite'},
        { id: 'doubleRooms', title: 'Double Room'},
        { id: 'singleRooms', title: 'Single Room'},
        { id: 'findUS', title: 'Where We Are'},
        { id: 'logon', title: 'Logon'},
        { id: 'admin', title: 'Admin'}
   ];

const suiteLists = [
    {
        name: "Secret Garden Heaven Suite",
        detail: "Perfect for guests seeking comfort, serenity, and a close connection to nature, this suite combines luxury with the charm of a private garden retreat.",
        price: "$200",
    },
    {
        name: "The Maharaja Lake Suite",
        detail: "Step into a beautifully designed Indian-inspired suite where elegance and tranquility meet. The suite features rich colors, handcrafted details, and a private balcony overlooking the peaceful lake.",
        price: "$250",
    },
    {
        name: "The Glittering Sea Loft",
        detail: "Experience luxury and elegance in this stunning two-level suite inspired by golden sunlight and sparkling glamour. Large windows and elevated views offer breathtaking panoramas of the sea, filling the suite with natural light from sunrise to sunset.",
        price: "$300",
    }

];


const doubleRoomLists = [
    {
        name: "Zen Garden Double Room",
        detail: "Inspired by Japanese simplicity and harmony, this bright double room offers a peaceful and elegant atmosphere. Large glass windows invite natural light into the space and create a seamless connection with the beautiful garden outside.",
        price: "$150",
    },
    {
        name: "Hikari Nature Room",
        detail: "Designed with Japanese-inspired minimalism, this double room is filled with natural light from floor-to-ceiling glass windows overlooking the garden. Soft neutral colors, light wood accents, and clean lines create a soothing and sophisticated environment.",
        price: "$150",
    },
    {
        name: "The Kyoto Light Room",
        detail: "Experience a calming retreat in this Japanese-inspired double room surrounded by garden views and natural daylight. Large panoramic windows allow sunlight to flow beautifully through the white, beige, and wooden interior design.",
        price: "$150",
    }

];

const singleRoomLists = [
    {
        name: "Crimson Silk Single Room",
        detail: "This China-inspired single room blends rich red tones with rustic elegance to create a warm and inviting atmosphere. Traditional design elements meet modern comfort, offering a peaceful space with cultural character.",
        price: "$100",
    },
    {
        name: "Red Lantern Serenity Room",
        detail: "The interior reflects harmony and tradition, creating a calm and grounding environment. Carefully chosen details and warm textures bring depth and cultural elegance to the space.",
        price: "$100",
    },
    {
        name: "Imperial Rouge Single Room",
        detail: "Experience a calming retreat in this Japanese-inspired double room surrounded by garden views and natural daylight. Large panoramic windows allow sunlight to flow beautifully through the white, beige, and wooden interior design.",
        price: "$100",
    }

];

const featureLists = [
    "Perfectly balanced blends",
    "Garnished to perfection",
    "Ice-cold every time",
    "Expertly shaken & stirred",
];



const storeInfo = {
    heading: "Where to Find Us",
    address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
    contact: {
        phone: "(555) 987-6543",
        email: "hello@jsmcocktail.com",
    },
};

const openingHours = [
    { day: "Mon–Thu", time: "11:00am – 12am" },
    { day: "Fri", time: "11:00am – 2am" },
    { day: "Sat", time: "9:00am – 2am" },
    { day: "Sun", time: "9:00am – 1am" },
];




export {
    navLinks,
    suiteLists,
    doubleRoomLists,
    singleRoomLists,
    featureLists,
    openingHours,
    storeInfo,

};
