const ExcursionCard = ({ excursion }) => {
    const str1 = excursion.photo_url.replace (/,/g, "");

    return (
        <div className="excursion-card">
            {console.log(excursion)}
            <img src={str1} alt={excursion.name} />
            <h2>{excursion.title}</h2>
            <p>{excursion.category_id}</p>
        </div>
    );
};

export default ExcursionCard;