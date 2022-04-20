for (let i=0; i<5; i++){
    console.log('*'.repeat(i+1))
}

//* 
//**
//***
//****
//*****

for(let i = 5; i => 1; i = i - 1){
    console.log('*', repeat(i))
}
//*****
//****
//***
//**
//*


for(let i = 0; i < 5; i++){
    console.log('*', repeat(5 - i))
}
//5-0 5
//5-1 4
//5-2 3
//5-3 2
//5-4 1

//*****
//****
//***
//**
//*


for (let i = 0; i < 10; i++){
    if(i % 2 === 0 )continue;
    console.log('*'.repeat(i))
}

//*
//***
//*****
//*******
//*********

for (let i = 0; i < 10; i++){
    if(i % 2 === 0 )continue;
    console.log('*'.repeat(10 - i))
}

//*********
//*******
//*****
//***
//*

for(let i = 0;i <= 5; i++){
    console.log(' '.repeat(5 - i) + '*'.repeat(i))
}

//*****
// ****
//  ***
//   **
//    *

for(let i = 0;i <= 5; i++){
    console.log(' '.repeat(i) + '*'.repeat(5 - i))
}

//    *
//   **
//  ***
// ****
//*****

for(let i = 0; i < 10;i = i + 2){
    console.log(' '.repeat((8 - i) / 2) + '*'.repeat(i + 1) + ' '.repeat((8 - i) / 2))
}


//    *
//   ***
//  *****
// *******
//*********
