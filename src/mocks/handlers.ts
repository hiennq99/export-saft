// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/export-saft', async () => {
    const responseStatus = [202, 422, 500][Math.floor(Math.random() * 3)];
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (responseStatus === 202) {
      return HttpResponse.json(
        {
          message:
            'As soon as you terminate the export process the file will be emailed to: john.doe@gmail.com.',
        },
        { status: 202 }
      );
    }

    if (responseStatus === 422) {
      return HttpResponse.json(
        {
          errors: [
            {
              error: 'Some parameters sent in the request were not valid.',
            },
          ],
        },
        { status: 422 }
      );
    }

    return HttpResponse.json(
      {
        errors: [
          {
            error: 'Error generating SAF-T. Please try again.',
          },
        ],
      },
      { status: 500 }
    );
  }),
];
