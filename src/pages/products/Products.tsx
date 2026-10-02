import PrimaryButton from '~/components/button/PrimaryButton'
import ProductsTable from './table/ProductsTable'
import AddIcon from '@mui/icons-material/Add'
import { ScreenPath } from '~/global/enum'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const navigate = useNavigate()
  const handleAddButton = () => {
    navigate(ScreenPath.ADD_PRODUCTS)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <PrimaryButton
        name='Add Product'
        type='submit'
        onClick={handleAddButton}
        variant='contained'
        icon={<AddIcon />}
      />
      <ProductsTable />
    </div>
  )
}

export default Products
