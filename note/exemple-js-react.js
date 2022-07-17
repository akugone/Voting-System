const tableau = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

tableau.forEach((element) => {
  console.log(element);
})

let somme = 0;

tableau.forEach((element) => {
    console.log(element);
    somme += element;
})

const tableau2 = tableau.reduce((somme, element) => {
    return somme += element;
})

function Toto(props){
    const cetruc = props.cetruc;

    return (
        <p>J'ai saute {cetruc} lignes.</p>
    )
}

function Toto(props){
    const {cetruc} = props;
    
    return (
        <p>J'ai saute {cetruc} lignes.</p>
    )
}

function Toto({cetruc}){
     
    return (
        <p>J'ai saute {cetruc} lignes.</p>
    )
}

const tableau3 = tableau.map((element) => <Toto cetruc={element} /> )

const tableau5 = tableau.map((element) => element * 2 )

const tableau6 = tableau.map((element) => {
    return element * 2;
})

const tableau4 = tableau.map( function(element) {
    return element * 2;
})

console.log(tableau2);
console.log(tableau3);