import { useState } from "react"
import AppNavbar from "./AppNavbar"

const Kontakto = () => {
    const [emri, setEmri] = useState("");
    const [mbiemri, setMbiemri] = useState("");
    const [subjekti, setSubjekti] = useState("");
    const [mesazhi, setMesazhi] = useState("");

    const onEmriChange = e => setEmri(e.target.value);
    const onMbiemriChange = e => setMbiemri(e.target.value);
    const onSubjektChange = e => setSubjekti(e.target.value);
    const onMesazhiChange = e => setMesazhi(e.target.value);

   /* const handleMessageChange = event => {

        setBody(event.target.value);
        console.log(event.target.value);
    };*/

    const handleSubmit = e => {
        e.preventDefault();

        const data = { emri, mbiemri, subjekti, mesazhi };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API + "contact", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    };



  return (
    <div className="Kontakto">
      <AppNavbar />
      <h3 className="mt-5">Na Kontakto</h3>
      <div className="mt-5 w-50 mx-auto">
        <form>
          <div class="mb-3">
            <div class="row g-3">

              <div class="col">
                <input type="text" class="form-control" placeholder="EMRI" aria-label="Emri" value={emri} onChange={onEmriChange} />
              </div>

              <div class="col">
                              <input type="text" class="form-control" placeholder="MBIEMRI" aria-label="Mbiemri" value={mbiemri} onChange={onMbiemriChange}/>
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label for="formGroupExampleInput" class="form-label">
                Subjekti
              </label>
                          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Subjekti Mesazhit" value={subjekti} onChange={onSubjektChange}/>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Mesazhi Juaj
                          </label>
                          <textarea class="form-control" id="body" name="body" rows="3" value={mesazhi} onChange={onMesazhiChange} />
            </div>
          </div>

          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Kontakto
