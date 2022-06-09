const url = 'mongodb://localhost:27017';
const dbName = "AgileApi";
const collectionName = "events";
const path = require("path");

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const getEventById = async (req, res) => {
    let { id, page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (id == undefined) {

        const list = await collection.find({}).sort({schedule:-1}).limit(limit).skip((page - 1) * limit).toArray();
        res.json(list);

    } else {


        const temp = await collection.findOne({ _id: new ObjectId(id) });
        console.log(temp);
        res.json(temp);

    }


};

const addEventPost = async (req, res) => {


    console.log("File Input");
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);


    if (!req.files) {
        return res.json({
            status: "fail",
            error: "Please upload images"
        });
    }


    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let imageUrls = [];

    req.files.map(element => {
        imageUrls.push({
            imagePath: element.path,
            originalname: element.originalname,
            imageName: element.filename
        })
    });

    const temp = await collection.insertOne({
        type: "event",
        uid: 18,
        name: req.body.name,
        images: imageUrls,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
        description: req.body.description,
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: parseInt(req.body.rigor_rank),
        attendees: req.body.attendees
    });

    res.json({
        status: "ok",
        id: temp.insertedId
    });


};

const updateEventPut = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    console.log("File Input");
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);


    if (!req.files) {
        return res.json({
            status: "fail",
            error: "Please upload images"
        });
    }


    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let imageUrls = [];

    req.files.map(element => {
        imageUrls.push({
            imagePath: element.path,
            originalname: element.originalname,
            imageName: element.filename
        })
    });

    const temp = await collection.replaceOne({
            _id: new ObjectId(id)
        },
        {
                type: "event",
                uid: 18,
                name: req.body.name,
                images: imageUrls,
                tagline: req.body.tagline,
                schedule: req.body.schedule,
                description: req.body.description,
                moderator: req.body.moderator,
                category: req.body.category,
                sub_category: req.body.sub_category,
                rigor_rank: parseInt(req.body.rigor_rank),
                attendees: req.body.attendees
        });

    res.json({
        status: "ok",
    });

};

const deleteEventById = async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const { id } = req.params;
    console.log(id);

    const temp = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(temp);

    res.json({
        status: "Deleted Successfully"
    });
}

module.exports = { getEventById, addEventPost, updateEventPut, deleteEventById }