using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;


namespace Application.Markets
{

    public class List
    {
        public class Query : IRequest<Result<List<Market>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Market>>>
        {
            private readonly DataContext _context;
    
            public Handler(DataContext context)
            {
           
                _context = context;
            }

            public async Task<Result<List<Market>>> Handle(Query request, CancellationToken cancellationToken)
            {
       
                return Result<List<Market>>.Success( await _context.Markets.ToListAsync(cancellationToken));
            }

    }


}


}