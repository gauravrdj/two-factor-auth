import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'
export default function Landing(){
    const [username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Enter your email" 
                            required 
                            onChange={(e)=>{
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Enter your password" 
                            required 
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button 
                        // type="submit" 
                        onClick={async(e)=>{
                            e.preventDefault();
                            setLoading(true);
                            try{
                              const res = await axios.post('https://two-factor-auth-ed42.onrender.com/signin', {
                                
                                    username,
                                    password
                                
                              })
                            //   console.log(res);
                            if(res.status===200){
                                 localStorage.setItem('token', `Bearer ${res.data.token}`);
                                // alert(res.data.msg)
                                toast.success(`${res.data.msg}`);
                                if(res.data.enabled===false){
                                    navigate('/enable/totp')
                                }
                                else{
                                    
                                    navigate('/verify/totp')
                                }
                            }
                            }
                            catch(e){
                                toast.error('Something went wrong');
                                //  console.log('Error while creating user')
                            }
                            setLoading(false);
                            
                        }}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                       {loading===true ? "Loading..." :  "Login"}
                    </button>
                    <div className="text-center mt-4">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}