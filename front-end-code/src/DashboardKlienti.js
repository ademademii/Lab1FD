import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import { axiosPrivate } from './api/axios';

const DashboardKlienti = (props) => {
  const [user, setUser] = useState();
  const roles = localStorage.getItem('roles');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const [porosite, setPorosite] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'porosia/' + localStorage.getItem("id"))
      .then(response => response.json())
      .then(data => {
        setPorosite(data)
      });
  }, [])

  return (
    <div>
      <Container className='py-4'>
        <h6>{username}</h6>
        <Row className='justify-content-center'>
          <Tabs justify variant='pills' defaultActiveKey="tab-1" className='mb-1 p-0 border'>
            <Tab eventKey="tab-1" title="Restorantet Favorite">
              tab1-content
            </Tab>
            <Tab eventKey="tab-2" title="Te dhenat e mia">
              <form className='w-50 mx-auto mt-5'>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                  <input type="text" class="form-control" defaultValue={username} disabled={true} />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                  <input type="text" class="form-control" defaultValue={email} disabled={true} />
                </div>
              </form>
            </Tab>
            <Tab eventKey="tab-3" title="Porositë e mia">
            <table className="table">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Adresa</th>
                        <th>Data</th>
                        <th>FormaPageses</th>
                        <th>Totali</th>
                    </tr>
                    {porosite!==undefined? porosite.map((item) => (
                        <tr key={item.porosiaId}>
                            <th scope="row">{item.porosiaId}</th>
                            <th scope="row">{item.adresa}</th>
                            <td>{item.dataPorosise}</td>
                            <td>{item.formaPageses}</td>
                            <td>{item.cmimiTotal}</td>
                        </tr>
                    )): <div className='text-center'>Nuk keni porosi</div>}
                </tbody>
            </table>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  )
}

export default DashboardKlienti
