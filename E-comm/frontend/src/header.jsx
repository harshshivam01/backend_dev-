
const Header = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-slate-900">
            <h1 className="text-2xl font-bold">E-comm</h1>
            <div className="flex gap-4">    
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search Product</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
            </div>
        </div>
    );
}

export default Header;
