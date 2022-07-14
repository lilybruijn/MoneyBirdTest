const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET apis/moneybird/invoices/
router.get("/", async (req, res) => {
try {
    const sales_invoices = await axios.get('https://moneybird.com/api/v2/234526464103416842/sales_invoices/', {
        headers: {
            'Authorization': 'Bearer guYEJ1KU6u7agjOgz0GtkxXLa_YfzP2Mnkdvm0Kv4Gs',
            'Access-Control-Allow-Headers' : '*'
        }
    });
    res.json(sales_invoices.data);
} catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
}
});

// GET apis/moneybird/invoices/expired
router.get("/expired", async (req, res) => {
    try {
        const sales_invoices = await axios.get('https://moneybird.com/api/v2/234526464103416842/sales_invoices.json?filter=state%3Alate|reminded', {
            headers: {
                'Authorization': 'Bearer guYEJ1KU6u7agjOgz0GtkxXLa_YfzP2Mnkdvm0Kv4Gs',
                'Access-Control-Allow-Headers' : '*'
            }
        });
        const tempArr = [];
        let myDate = new Date();
        myDate.setDate(myDate.getDate() - 31);

        sales_invoices.data.forEach(element => {
            if(Date.parse(element.invoice_date) < myDate && element.company_name !== "Advanza") {
                tempArr.push({
                    contact_id: element.contact.id, 
                    company_name: element.contact.company_name, 
                    invoice_id: element.invoice_id,
                    invoice_date: element.invoice_date, 
                    invoice_status: element.state,
                    notes_content: element.notes,
                    notes: element.events.filter(event => event.action === 'note_created').length > 0
                })
            }
        });
        res.send(tempArr);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Server error" });
    }
    });

module.exports = router;