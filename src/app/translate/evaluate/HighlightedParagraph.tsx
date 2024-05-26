import React from 'react';

interface objectOfWords{
  id:string,
  text:string
}

interface HighlightedParagraphProps {
  dynamicParagraph: string;
  wordsToHighlight: objectOfWords[],
  currentActiveWord:string
}

const HighlightedParagraph: React.FC<HighlightedParagraphProps> = ({ dynamicParagraph, wordsToHighlight , currentActiveWord }) => {
  const Lines = dynamicParagraph.split("\n").filter(word => word.trim() !== '');
  let wordsToHighlightCount=0;
  let arrayOfwords:any =[]
  for(var i=0;i<wordsToHighlight.length;i++){
    arrayOfwords.push(wordsToHighlight[i].text);
  }
  const shouldHighlight = (word: string) =>{
    if(arrayOfwords.includes(word) && word==wordsToHighlight[wordsToHighlightCount]?.text){
      wordsToHighlightCount++
      return true;
    }
    return false;
  }
  const activeWordDetect = (word:string)=>{
    const objectWord = wordsToHighlight.find(obj => obj.id === currentActiveWord);
    if(objectWord){
       if(objectWord.text===word){
          return "#C1F2B0"
       }
    }
    return '#F1E740'
  }
  return (
    <div className="flex flex-col w-full flex-wrap gap-1 px-6 my-[20px]">
      {Lines.map((line, index) => {
        const mixedWords = line.split(" ");
        return (
          <h1 key={index} className='flex flex-wrap gap-1 pl-6 w-full text-left'>
          {mixedWords.map((mixedWord, innerIndex) => (
            shouldHighlight(mixedWord) ? (
                <span key={innerIndex} style={{backgroundColor:activeWordDetect(mixedWord)}} className="px-2 rounded-[5px] text-[0.9rem]">
                  {mixedWord}
                </span>
            ) : (
                <span key={innerIndex} className='text-[0.93rem]'>
                  {mixedWord}
                </span>
            )
          ))}
          </h1>
        )
      })}
    </div>
  );
};

export default HighlightedParagraph;





///    <p className='flex gap-1 flex-wrap px-4 text-left my-[40px]'>