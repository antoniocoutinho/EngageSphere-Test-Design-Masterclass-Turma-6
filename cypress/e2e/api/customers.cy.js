describe('Customers API - GET /customers', () => {
    const apiUrl = 'http://localhost:3001/customers?page=1&limit=10&size=All&industry=All';

    it('It should returns the correct status and body structure', () => {
        cy.request({
            method: 'GET',
            url: apiUrl
        }).then((response) => {
            expect(response.status).to.eq(200);

            // Body Validation (Customers)
            expect(response.body).to.have.property('customers').and.be.an('array');
            // Validating the structure of the first customer object
            const firstCustomer = response.body.customers[0];
            expect(firstCustomer).to.have.all.keys('id', 'name', 'employees', 'contactInfo', 'size', 'industry', 'address');

            expect(firstCustomer.address).to.have.property('city');
            expect(firstCustomer.address).to.have.property('country');
        });
    });
});