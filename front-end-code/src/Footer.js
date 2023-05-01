import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer class="bg-light text-center text-lg-start">

                <div class="container p-4 pb-0">
                    <form action="">

                        <div class="row">

                            <div class="col-auto mb-4 mb-md-0">
                                <p class="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>



                            <div class="col-md-25 col-20 mb-4 mb-md-0">

                                <div class="form-outline mb-4">
                                    <input type="email" id="form5Example25" class="form-control" />
                                    <label class="form-label" for="form5Example25">Email address</label>
                                </div>
                            </div>



                            <div class="col-auto mb-4 mb-md-0">

                                <button type="submit" class="btn btn-primary mb-4">
                                    Subscribe
                                </button>
                            </div>

                        </div>

                    </form>
                </div>



                <div class="text-center p-3">
                    © 2022 Copyright: 
                    <a class="text-dark" href="https://github.com/fitoretahiri/Food-delivery-app-LabCouse1"> GitHub</a>
                </div>

            </footer>
        )
    }
}
export default Footer;