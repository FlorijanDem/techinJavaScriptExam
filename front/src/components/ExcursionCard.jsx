const ExcursionCard = ({ excursion }) => {
    return (
        <div className="excursion-card">
            {/* {console.log(excursion)} */}
            <img src={excursion.photo_url} alt={excursion.name} />
            <h2>{excursion.title}</h2>
            {/* <p>{excursion.description}</p> */}
            <p>Price: {excursion.price}</p>
        </div>
    );
};

export default ExcursionCard;