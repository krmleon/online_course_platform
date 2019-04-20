import { useState } from 'react';

/**
 * Hook lomakkeiden käsittelyyn.
 * @param {function} callback 
 */
const useForm = (callback) => {

  /** Komponentin tila (lomakkeen arvot). */
  const [values, setValues] = useState([]);

  /** Tapahtumankäsittelijä, jota kutsutaan lomaketta lähetettäessä. Kutsuu callback-funktiota. */
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  /** Tapahtumankäsittelijä, jota kutsutaan lomakkeen arvoja muutettaessa. Asettaa lomakkeen arvon
   * komponentin tilaan.
    */
  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;