export default function PurchaseCard(idCustomer,idProduct){
    return(
        <div>
            <h2>Producto Comprado</h2>
            <div className="product-list">
                <div className="product-card">
                    <img src="https://via.placeholder.com/150" alt="Producto" />
                    <h3>Nombre del producto</h3>
                    <p>Descripción del producto</p>
                    <p className="price">Precio: $100</p>
                    <p className="stock">Stock: 10</p>
                    <button>Comprar</button>
                </div>
            </div>
        </div>
    );
}