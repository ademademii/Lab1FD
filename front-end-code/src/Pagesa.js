import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
const Pagesa = () => {
    const myStyle = {
        backgroundColor: '#f0efef',
    };

    const styling = {
        fontSize: '20px'
    };

    return (
        <div style={myStyle}>

            <div className="d-flex justify-content-center align-content-center">

                <div>
                    <form>
                        <div class="form-check d-flex justify-content-center mt-5">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form6Example8" checked />
                            <label class="form-check-label" for="form6Example8"> Paguaj me para ne dore </label>
                        </div>
                        <div class="form-check d-flex justify-content-center">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form6Example8" unchecked />
                            <label class="form-check-label" for="form6Example8"> Paguaj permes bankes</label>
                        </div>

                        <div class="form-outline mb-4 mt-5">
                            <h2 class="form-check-label" for="form6Example3" style={styling}> Totali ne euro:  12.25€</h2>
                        </div>

                        <div class="form-outline mb-1">
                            <label class="form-label" for="form6Example4">Adresa ku doni te ju dorezohet pako:</label>
                        </div>

                        <div class="form-outline mb-1">
                            <input type="text" id="form6Example5" class="form-control" />
                            <label class="form-label" for="form6Example5">Numri i telefonit ku deshironi te ju therrasim:</label>
                        </div>
                        <div class="form-outline mb-1">
                            <input type="text" id="form6Example5" class="form-control" />
                            <label class="form-label" for="form6Example7">Numri i xhirollogarise</label>
                        </div>

                        <div class="form-outline mb-1">
                            <input type="text" id="form6Example6" class="form-control" />
                            <label class="form-label" for="form6Example6">Te dhena shtese qe mendoni qe na nevojiten:</label>
                        </div>

                        <div class="form-outline mb-1">
                            <textarea class="form-control" id="form6Example7" rows="4"></textarea>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" class="btn btn-primary btn-lg mb-5 mt-3">Paguaj</button>
                        </div>
                        </form>
                    </div>
            </div>
        </div>
    );
}

export default Pagesa;