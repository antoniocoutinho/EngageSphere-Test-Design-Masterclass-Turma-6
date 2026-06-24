describe('Customers API - GET /customers', () => {

    const API_URL = Cypress.expose('API_URL')
    const CUSTOMERS_API_URL = `${Cypress.expose('API_URL')}/customers`
    //const apiUrl = 'http://localhost:3001/customers?page=1&limit=10&size=All&industry=All';

    it('should returns the correct status and body structure', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API_URL}`
        }).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('customers').and.be.an('array');
            const firstCustomer = response.body.customers[0];
            expect(firstCustomer).to.have.all.keys(
                'id',
                'name',
                'employees',
                'contactInfo',
                'size',
                'industry',
                'address'
            );

            expect(firstCustomer.address).to.have.property('city');
            expect(firstCustomer.address).to.have.property('country');
        });
    });
});