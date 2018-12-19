exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(()=>knex('users').insert([
      {
          firstName: "Guille",
          lastName: "Antico",
          email: "guille@test.com",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiR3VpbGxlIiwibGFzdF9uYW1lIjoiQW50aWNvIiwiZXhwIjoxNTM4NDY2NjY2LCJlbWFpbCI6ImFndWlsbGVfQGhvdG1haWwuY29tIiwiaWF0IjoxNTM4MjUwNjY2fQ.AyUI6ksL4dQe2PFmpq0I9YJkkKWIpDAvtI9eaKbA1kU",
          created: 'now()',
          modified: 'now()',
      }
  ]))
};
