export default function Product({product}) {
    return <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price} $</td>
        <td>{product.description.slice(0,100)}...</td>
        <td><span className="badge badge-pill bg-dark">{product.category}</span></td>
        <td><img width={250} src={product.image_url} alt={product.name}/></td>
    </tr>
}