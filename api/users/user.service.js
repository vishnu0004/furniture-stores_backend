const db = require("../../config/db"); // Assuming you have a db config file
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
GetProducts: (data, callback) => {
  // console.log(data);

  const category_id = data.query?.id; // ✅ extract id safely

  let sql = ``;
  if (category_id) {
    sql = `
      SELECT p.id, p.name, p.description, p.price, p.image, 
             p.category_id, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE c.id = '${category_id}'
    `;
  } else {
    sql = `
      SELECT p.id, p.name, p.description, p.price, p.image, 
             p.category_id, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;
  }

  db.query(sql, [], (err, results) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, results);
    }
  });
},

  search: (data, callback) => {
    const { q } = data.body;
    if (!q) return callback(null, []);

    const searchTerm = `%${q.toLowerCase()}%`; // lowercase search

    // console.log(searchTerm, "searchTerm");

    const query = `
    SELECT p.id, p.name, p.description, p.price, p.image, p.category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE LOWER(p.name) LIKE ? OR LOWER(c.name) LIKE ?
  `;

    db.query(query, [searchTerm, searchTerm], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },
  getproductbyid: (data, callback) => {
    // console.log(data.query.id);

    const id = data.query.id; // get product ID from input

    // console.log(id);

    if (!id) return callback(null, null); // if no ID, return null

    const query = `
      SELECT p.id, p.name, p.description, p.price, p.image, p.category_id, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null); // no product found
      return callback(null, results[0]); // return single product
    });
  },
  contactus: (data, callback) => {
  const { name, number, message } = data.body;

  if (!name || !number || !message) {
    return callback(new Error("All fields (name, number, message) are required"));
  }

  const query = `
    INSERT INTO contactus (name, number, message, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [name, number, message], (err, result) => {
    if (err) return callback(err);

    // ✅ Create WhatsApp link (replace with your WhatsApp number)
    const adminNumber = "918320955139"; // 👈 your WhatsApp number in international format (no + sign)
    const encodedMessage = encodeURIComponent(
      `📩 नई पूछताछ प्राप्त हुई!\n\nनाम: ${name}\nफ़ोन: ${number}\nसंदेश:\n${message}`
    );
    const whatsappLink = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    // ✅ Send response with WhatsApp link
    return callback(null, {
      success: true,
      insertId: result.insertId,
      whatsappLink: whatsappLink,
    });
  });
},

  // contactus: (data, callback) => {

  //   const { name, number, message } = data.body;
  //       // console.log(name,number,message);


  //   if (!name || !number || !message) {
  //     return callback(
  //       new Error("All fields (name, number, message) are required")
  //     );
  //   }

  //   const query = `
  //     INSERT INTO contactus (name, number, message, created_at)
  //     VALUES (?, ?, ?, NOW())
  //   `;

  //   db.query(query, [name, number, message], (err, result) => {
  //     if (err) return callback(err);

  //     // ✅ After saving, send email
  //     let transporter = nodemailer.createTransport({
  //       service: "gmail", // or SMTP settings
  //       auth: {
  //         user: "parvatifurniture19@gmail.com", // replace with your email
  //         pass: "kdqwglakmfystkdf", // use app password, not real password
  //       },
  //     });


  //       let mailOptions = {
  //           from: `"पार्वती फर्नीचर" <parvatifurniture19@gmail.com>`,
  //           to: "parvatifurniture19@gmail.com",
  //           subject: `नई पूछताछ ${name} से`,
  //           text: `
  //       नमस्ते एडमिन,

  //       आपको पार्वती फर्नीचर संपर्क फ़ॉर्म से एक नया संदेश प्राप्त हुआ है।

  //       नाम: ${name}
  //       फ़ोन नंबर: ${number}

  //       संदेश:
  //       ${message}

  //       सादर,  
  //       पार्वती फर्नीचर
  //       `
  //       };




  //     transporter.sendMail(mailOptions, (mailErr, info) => {
  //       if (mailErr) {
  //         console.error("Email error:", mailErr);
  //         return callback(null, {
  //           success: true,
  //           insertId: result.insertId,
  //           email: "failed",
  //         });
  //       }
  //       return callback(null, {
  //         success: true,
  //         insertId: result.insertId,
  //         email: "sent",
  //       });
  //     });
  //   });
  // },
  gettrproducts:(data, callback)=>{
  const query = `
        SELECT p.id, p.name, p.description, p.price, p.image, 
              p.category_id, c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        where p.trproduct = 1
      `;

      db.query(query, [], (err, results) => {
        if (err) {
          return callback(err);
        } else {
          // console.log(results);

          return callback(null, results);
        }
      });
  },
  getcatproducts:(data, callback)=>{
      
      const category_id = data.body.category_id
      
  const query = `
        SELECT p.id, p.name, p.description, p.price, p.image, 
              p.category_id, c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        where c.id = ?
      `;

      db.query(query, [category_id], (err, results) => {
        if (err) {
          return callback(err);
        } else {
          // console.log(results);

          return callback(null, results);
        }
      });
  },
  gettrcategories:(data, callback)=>{
  const query = `
        SELECT * from categories where pcategories = 1 `;

      db.query(query, [], (err, results) => {
        if (err) {
          return callback(err);
        } else {
          // console.log(results);

          return callback(null, results);
        }
      });
  }
};
