import { NameModels } from '../../model'
import { uploadCSVReducer } from '../UploadcsvSlice'

const changeCSVSelect = (nameModel: NameModels, dispatch: any) => {
    dispatch(uploadCSVReducer({
        modelSelected: nameModel
    }))
}

export default changeCSVSelect