import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { getPurchases } from "../api/service/OrderService";
import '../styles/purchase-history.css'
import ButtonBack from "./utils/BackButton";
export default function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const token = useSelector((state) => state.user.token);
    useEffect(() => { 
            const fetchPurchases = async () => {
                try {
                    const data = await getPurchases(token);
                    setPurchases(data);
                } catch (error) {
                    console.error('Error fetching purchases:', error);
                }
            }
            fetchPurchases()
        }, 
                
    [])


    return (
        <div>
        <ButtonBack/>
        {
            (purchases.length > 0) ? (
                purchases.map((purchase) => (
                    <div className="purchase-container" key={purchase.idPurchase}>
                      <h3>{purchase.name}</h3>
                      <p className="purchise-price">Precio del producto: ${purchase.price}</p>
                      <p className="purchise- stock">Stock comprado : {purchase.stockToBuy}</p>
                      <p className="purchised-price"> Costo: {purchase.pricePurchased}</p>  
                    </div>
            ))
            ) 
            : 
            <div className="no-purchases-message">Aun no hay compras registradas </div> 
        }
        
        </div>
    )
}