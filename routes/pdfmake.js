const express = require("express");
const router = express.Router();
const PDF = require("pdfmake");

// const pdfMake = require("../pdfmake/pdfmake");
// const vfs = require("../pdfmake/pdfmake");

var pdfMake = require("pdfmake/build/pdfmake.js");
var vfsFonts = require("pdfmake/build/vfs_fonts.js");
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// const vfsFonts = require("../pdfmake/vfs_fonts");

PDF.vfs = vfsFonts.pdfMake.vfs;
router.post("/pdf", async(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    try {
        var documentDefinition = {
            content: [
                `Hello ${fname} ${lname}
                Nice to meet you sir`,
            ],
        };

        const pdfDoc = await PDF.createPdf(documentDefinition).open();
        pdfDoc.getBase64((data) => {
            res.writeHead(200, {
                "content-Type": "application/pdf",
                "content-Disposition": 'attachment;filename="filename.pdf"',
            });
            const download = Buffer.from(data.toString("utf-8"), "base64");
            res.end(download);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;