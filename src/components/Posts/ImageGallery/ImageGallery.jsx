import './ImageGallery.scss';

const ImageGallery = ({ images }) => {
    return (
        <div className={images.length === 1 ? 'single' : 'grid'}>
            {images.map((img) => (
                <div key={img.id} className={'imageWrapper'}>
                    <img src={img.image} />
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
