import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import newsLetterImg from '../../assets/images/newsletter.png';
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";


const Footer = () => {
    return (
        <>
            <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {/* <p className="text-white mb-1">$20 discount for your first order</p> */}
                            <h3 className="text-white">Join To Get Latest Update of new Collection..</h3>
                            <p className="text-light">Join our email subscription now to get updates on<br /> new arrivels and coupons.</p>


                            <form className="mt-4">
                                <IoMailOutline />
                                <input type="text" placeholder="Your Email Address" />
                                <Button>Subscribe</Button>
                            </form>

                        </div>

                        <div className="col-md-6">
                            <img src={newsLetterImg} />
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="topInfo row">
                        <div className="col d-flex align-items-center">
                            <span><LuShirt /></span>
                            <span className="ml-2">New Products</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span><TbTruckDelivery /></span>
                            <span className="ml-2">Free delivery for order over Rs. 4999</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span><TbDiscount2 /></span>
                            <span className="ml-2">Daily Mega Discounts</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span><CiBadgeDollar /></span>
                            <span className="ml-2">Best price on the market</span>
                        </div>
                    </div>



                    <div className="row mt-5 linksWrap">
                        <div className="col">
                            <h5>Phones</h5>
                            <ul>
                                <li><Link to="#">Apple</Link></li>
                                <li><Link to="#">OPPO</Link></li>
                                <li><Link to="#">Samsung</Link></li>
                                <li><Link to="#">Redmi</Link></li>
                                <li><Link to="#">Motorela</Link></li>
                                <li><Link to="#">OnePlus</Link></li>
                                
                            </ul>
                        </div>

                        <div className="col">
                            <h5></h5>
                            <br/>
                            <ul>
                                <li><Link to="#">Nokia</Link></li>
                                <li><Link to="#">Techno</Link></li>
                                <li><Link to="#">Motorola</Link></li>
                                <li><Link to="#">Vivo</Link></li>
                                <li><Link to="#">Realme</Link></li>
                                <li><Link to="#">Google</Link></li>
                                
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Links</h5>
                            <ul>
                                <li><Link to="/policies" target="_blank">Terms & Condition</Link></li>
                                <li><Link to="/policies" target="_blank">Privacy & Policy</Link></li>
                                <li><Link to="/policies" target="_blank">Return & Refund</Link></li>
                                <li><Link to="/policies" target="_blank">Cancellation Policy</Link></li>
                                
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Address</h5>
                            <p>Station Road, Malgodam Rd, Ballia, Uttar Pradesh 277001</p>
                            <h5>Contact</h5>
                            <ul>
                                <p><Link to="#">+91 8931917099</Link></p>
                                <p><Link to="#">contact@ranienterprisesballia.com</Link></p>
                                
                                
                            </ul>
                            
                        </div>

                        
                    </div>



                    <div className="copyright mt-3 pt-3 pb-3 d-flex">
                        <p className="mb-0">© Rani Enterprises. All Rights Reserved.br
                        Designed & Developed by <a href="https://dizilight.com/" target="_blank">Dizilight Corporation</a></p>
                        <ul className="list list-inline ml-auto mb-0 socials">
                            <li className="list-inline-item">
                                <Link to=""><FaFacebookF /></Link>
                            </li>

                            <li className="list-inline-item">
                                <Link to="#"><FaTwitter /></Link>
                            </li>

                            <li className="list-inline-item">
                                <Link to="https://www.instagram.com/ranienterprisesofficial?igsh=cjcya3k1eDJ6Y3p1"><FaInstagram /></Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </footer>
        </>
    )
}

export default Footer;