﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class Details
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ActivityDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<ActivityDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var activity = await _context
                .Activities.ProjectTo<ActivityDto>(
                    _mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() }
                )
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            //we can't use findasync with projections
            return Result<ActivityDto>.Success(activity);
        }
    }
}
