import Card from './../Card';
import './styles.css';

type Props = {
  data : Array<any>
}

function CardList({ data }:Props) {
  console.log( data )
    return (
      <div className="card-list-container">
        <div className="layout-container">
          {data.map((item) => {
            return <Card id={item.id} abilities={item.abilities} name={item.name} image={item.sprites.front_default} weight={item.weight} height={item.height}/>
          })}
        </div>
      </div>
    );
  }
  
  export default CardList;