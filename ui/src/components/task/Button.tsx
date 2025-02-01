
//Example of button that inherits buttonClick() function from parent so parent can reference when button is clicked
interface Prop {
  buttonClick: () => void;
}

function Button( {buttonClick} : Prop) {
  return (
    <>
      <button type='button' className='btn btn-primary' onClick={buttonClick}>Button</button>
    </>
  );
}

export default Button;
