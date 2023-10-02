using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Markets
{
    public class Details
    {
        public class Query : IRequest<Result<Market>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Market>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Market>> Handle(Query request, CancellationToken cancellationToken)
            {
                var market = await _context.Markets.FindAsync(request.Id);
                return Result<Market>.Success(market);
            }
        }

    }
}