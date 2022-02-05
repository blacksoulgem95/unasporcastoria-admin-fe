import Card from "../Card";
import {useItems} from "../../services/ItemService";
import {label} from "../../utils";
import {getStorage} from "@firebase/storage";
import {useState} from "react";
import noImg from "../../asset/no_img.png"

function AdminItem({item, callback}) {

    const {state, deleteItem} = useItems()
    const [image, setImage] = useState(noImg)

    const buttons = [
        {action: () => alert('Work in progress'), label: label('fas fa-image', 'Foto'), loading: state.loading},
        {action: () => alert('Work in progress'), label: label('fas fa-folder-open', 'Apri'), loading: state.loading},
        {
            action: () => alert('Work in progress'),
            label: label('fas fa-pencil-alt', 'Modifica'),
            loading: state.loading
        },
        {action: () => deleteItem(item.id, callback), label: label('fas fa-trash', 'Elimina'), loading: state.loading}
    ]


    if (item.imageUrl)
        getStorage().ref(item.imageUrl).getDownloadURL().then(setImage)

    const body = imgUrl => {
        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src={imgUrl} alt="Placeholder image"/>
                    </figure>
                </div>
                <div className="media-content">
                    <p>{item.description}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <>
                <Card title={`${item.name} - ID ${item.id}`}
                      // image={image}
                      body={body(image)}
                      buttons={buttons}
                />
            </>
        </>
    )
}

export default AdminItem