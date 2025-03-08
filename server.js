// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || "your_local_mongodb_uri";

// // Connect to MongoDB Atlas or Local MongoDB
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.log("MongoDB Connection Error:", err));

// const LocationSchema = new mongoose.Schema({
//     latitude: Number,
//     longitude: Number
// });

// const Location = mongoose.model('Location', LocationSchema);

// app.post('/save-location', async (req, res) => {
//     try {
//         const { latitude, longitude } = req.body;
//         const newLocation = new Location({ latitude, longitude });
//         await newLocation.save();

//         // Sending only one response with all messages combined
//         res.json({
//             message: " आपकी लोकेशन सेव कर ली गई है और पुलिस स्टेशन को अपराध की जांच के लिए भेज दी गई है! यदि आप किसी लड़की को परेशान कर रहे हैं या किसी संदिग्ध गतिविधि में शामिल पाए जाते हैं, तो आपके खिलाफ स्वतः ऑनलाइन एफआईआर दर्ज कर दी जाएगी। YOUR LOCATION HAS BEEN SAVED AND TRANSFERRED TO THE POLICE STATION TO CHECK FOR CRIME! IF YOU ARE TEASING A GIRL OR FOUND INVOLVED IN SUSPICIOUS ACTIVITY, AN ONLINE FIR WILL BE AUTOMATICALLY GENERATED AGAINST YOU.Development to Support Girls & Stop Crime Nikhil (Information Technology, 12205416",
            
//         });
//         console.log("new location find");

//     } catch (error) {
//         res.status(500).json({ error: "Failed to save location" });
//     }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "your_local_mongodb_uri";

// Connect to MongoDB Atlas or Local MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const LocationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number
});

const Location = mongoose.model('Location', LocationSchema);

app.post('/save-location', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and Longitude are required" });
        }

        const newLocation = new Location({ latitude, longitude });
        await newLocation.save();

        res.json({
            message: "आपकी लोकेशन सेव कर ली गई है और पुलिस स्टेशन को अपराध की जांच के लिए भेज दी गई है! यदि आप किसी लड़की को परेशान कर रहे हैं या किसी संदिग्ध गतिविधि में शामिल पाए जाते हैं, तो आपके खिलाफ स्वतः ऑनलाइन एफआईआर दर्ज कर दी जाएगी। YOUR LOCATION HAS BEEN SAVED AND TRANSFERRED TO THE POLICE STATION TO CHECK FOR CRIME! IF YOU ARE TEASING A GIRL OR FOUND INVOLVED IN SUSPICIOUS ACTIVITY, AN ONLINE FIR WILL BE AUTOMATICALLY GENERATED AGAINST YOU.Development to Support Girls & Stop Crime Nikhil (Information Technology, 12205416",
        });

        console.log("New location saved:", { latitude, longitude });

    } catch (error) {
        console.error("Error saving location:", error);
        res.status(500).json({ error: "Failed to save location" });
    }
});

// Start server, listen on "0.0.0.0" for Render
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
