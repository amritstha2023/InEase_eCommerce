import axios from "axios";
import myKey from "./myKey";
// import Order from "../pages/users/order";

const KhaltiConfig = async (orderId,totalAmount,product_name) => {
    const key = '86943d8c85b54915a1c74b5d4256ab2e';
    const url = "https://a.khalti.com/api/v2/epayment/initiate/";

    const payload = {
      return_url: `http://localhost:3000/orders`,
      website_url: "http://localhost:3000",
      amount: + totalAmount * 100, 
      purchase_order_id: orderId, 
      purchase_order_name: product_name,
      customer_info: {
        "name": 'user_name',
        "phone": "9811496763",
        "address": "Address 3 Main Street"
    },
  };
    
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `key ${myKey.secretKey}`,
        },
    };

    try {
        const response = await axios.post(url, payload, config);

        console.log("Response  is" , response)

        if (response.status === 200) {
            const data = response.data;
            console.log({data});       

            window.location.href = data.payment_url

          

            console.log({data});   
        
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error(error);
    }

};

export default KhaltiConfig;