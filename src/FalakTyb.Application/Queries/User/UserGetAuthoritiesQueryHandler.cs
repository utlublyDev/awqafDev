using awqaf.Domain.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class UserGetAuthoritiesQueryHandler : IRequestHandler<UserGetAuthoritiesQuery, IEnumerable<string>>
    {
        private readonly IUserService _userService;

        public UserGetAuthoritiesQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public Task<IEnumerable<string>> Handle(UserGetAuthoritiesQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_userService.GetAuthorities());
        }
    }
}
