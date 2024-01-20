
  function generateTicketSet(N) {
    const ticketSets = {};
  
    for (let setNumber = 1; setNumber <= N; setNumber++) {
        const ticketArraySet = {};
        for (let ticketNumber = 1; ticketNumber <= 6; ticketNumber++) {
            const ticketArray = generateTicket();
            ticketArraySet[ticketNumber] = ticketArray;
        }
        ticketSets[setNumber] = { "tickets": ticketArraySet };
    }
  
    return ticketSets;
  }
  
  function generateTicket() {
  const ticketArray = Array.from({ length: 3 }, () => Array(9).fill(0));
  const totalNumbers = Array.from({ length: 90 }, (_, index) => index + 1);
  const totalIndices = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      totalIndices.push([i, j]);
    }
  }
  const randomIndices = [];
  
  const firstRow = shuffle(totalIndices.slice(0, 9)).slice(0, 5);
  const secondRow = shuffle(totalIndices.slice(9, 18)).slice(0, 5);
  const thirdRow = shuffle(totalIndices.slice(-9)).slice(0, 5);
  
  randomIndices.push(...firstRow, ...secondRow, ...thirdRow);
  
  randomIndices.forEach((num) => {
    const columnIndex = num[1];
    let number;
    switch (columnIndex) {
      case 0:
        number = getRandomNumber(totalNumbers, 1, 9);
        break;
      case 1:
        number = getRandomNumber(totalNumbers, 10, 19);
        break;
      case 2:
        number = getRandomNumber(totalNumbers, 20, 29);
        break;
      case 3:
        number = getRandomNumber(totalNumbers, 30, 39);
        break;
      case 4:
        number = getRandomNumber(totalNumbers, 40, 49);
        break;
      case 5:
        number = getRandomNumber(totalNumbers, 50, 59);
        break;
      case 6:
        number = getRandomNumber(totalNumbers, 60, 69);
        break;
      case 7:
        number = getRandomNumber(totalNumbers, 70, 79);
        break;
      case 8:
        number = getRandomNumber(totalNumbers, 80, 90);
        break;
    }
    ticketArray[num[0]][num[1]] = number;
    totalNumbers[totalNumbers.indexOf(number)] = 0;
  });
  
  for (let col = 0; col < 9; col++) {
    const columnValues = ticketArray.map((row) => row[col]).filter((value) => value !== 0);
    columnValues.sort((a, b) => a - b);
  
    let rowIndex = 0;
    for (let i = 0; i < 3; i++) {
      if (ticketArray[i][col] !== 0) {
        ticketArray[i][col] = columnValues[rowIndex];
        rowIndex++;
      }
    }
  }
  
  return ticketArray;
  }
  
  function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
  }
  
  function getRandomNumber(numbers, min, max) {
  const validNumbers = numbers.filter((num) => num >= min && num <= max);
  const randomIndex = Math.floor(Math.random() * validNumbers.length);
  const number = validNumbers[randomIndex];
  return number;
  }
  


  module.exports = { generateTicketSet, generateTicket };


