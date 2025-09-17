import Header from "../components/Header";

export default function CartPage ({cartItems = []}) {
    return (
        <>
        <Header />
        <div className="title"><h1>Shopping Cart</h1></div>
        <div className="cart-container">
            <div className="items-container">
                {cartItems.map(item => (
                    <Products
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      imgSrc={item.imgSrc}
                      imgAlt={item.imgAlt}
                      price={item.price}
                    />
                ))}
            </div>
        </div>
        </>
    )
}