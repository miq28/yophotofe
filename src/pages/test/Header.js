import React from 'react';
import logo from './logo.svg';

import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, Dropdown, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

const Header = () => (
    <header>
        <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>

            <Container>
                <Row className="g-0 position-relative w-100 align-items-center">

                    <Col className="d-none d-lg-flex justify-content-start">
                        <Nav className="mrx-auto" navbar>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">
                                    <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                                </NavLink>
                            </NavItem>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">Home</NavLink>
                            </NavItem>

                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">Events</NavLink>
                            </NavItem>

                            <UncontrolledDropdown className="d-flex align-items-center" nav>
                                <DropdownToggle className="font-weight-bold" nav caret>Learn</DropdownToggle>
                                <DropdownMenu down>
                                    <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Learn React</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Documentation</DropdownItem>
                                    <DropdownItem>Tutorials</DropdownItem>
                                    <DropdownItem>Courses</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Col>

                    <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                        <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                            <img src={logo} alt="logo" className="position-relative img-fluid" />
                        </NavbarBrand>
                    </Col>

                    <Col className="d-none d-lg-flex justify-content-end">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                        </div>
                    </Col>

                </Row>
            </Container>

        </Navbar>
    </header>
);

export default Header;