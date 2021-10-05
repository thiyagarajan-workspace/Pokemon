import './styles.css';

type Props = {
    id : string,
    name : string,
    image : string,
    weight : string,
    height : string,
    abilities : Array<any> | [],
}

function Card({id, name, abilities, weight, height, image }:Props) {
    return (
      <div id={id} className="card-container">
        <div className="title-container">
          <h3 className="title">{ name }</h3>
        </div>
          <div className="image-container">
             <img className="image" src= {image}/>
          </div>
          <div className="detail-container">
            <pre className="weight">{`Wight      - ${ weight }`}</pre>
            <pre className="height">{`Height     - ${ height }`}</pre>
              <h5 className="abilities">{`Abilities  `}</h5>
              {abilities.map((item:any) => { return <pre>{item.ability.name}</pre>})}
          </div>
      </div>
    );
  }
  
  export default Card;