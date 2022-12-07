import Layout from "@/components/Layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector} from "@/store/slices/userSlice";
import { productSelector,getProducts} from "@/store/slices/productSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/components/withAuth";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ProductData } from "@/models/product.model";
import { getProfile } from "@/store/slices/userSlice";


type Props = {};
const Home = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    console.log("effe")
    dispatch(getProfile())
    dispatch(getProducts());
  }, []);
  
  const productList = useSelector(productSelector);
  console.log("productList-->",productList)

  const [selectedProduct, setSelectedProduct] = React.useState<ProductData | null>(null);

  const listItems = productList.products.map((iProduct) =>
    <li key={iProduct.id}>
      {iProduct.description}
    </li>
  );
  //const token =  document.cookie
  
  //const useSelector = useSelector((store:any)=>store.user)

  return (
    <Layout>

      <Typography variant="h3">Responsive h3</Typography>
      <Typography variant="h4">Responsive h4</Typography>
      <Typography variant="h5">Responsive h5</Typography>
      <Typography variant="h5">Token   </Typography>
      <Typography variant="h5">ฟอนต์ (Font) ที่จะแนะนำต่อไปนี้เป็นฟอนต์ภาษาไทยที่สวยงาม ดูเป็นมิตร สามารถกับงานส่วนตัวหรือเพื่อการศึกษาได้ฟรี ส่วนงานเพื่อการค้าอาจจะต้องซื้อลิขสิทธิ์ฟอนต์นะคะ   </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="primary">
          Success
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" href="#outlined-buttons">
          Link
        </Button>
        {/* <button onClick={toggleButtonState}> Click me </button> */}
        {/* <div>{this.state.result}</div> */}
      </Stack>
      <ul>{listItems}</ul>
      
    </Layout>
  );
};
export default withAuth(Home);
