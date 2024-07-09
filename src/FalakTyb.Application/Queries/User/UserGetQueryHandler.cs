using AutoMapper;
using System.Linq;
using awqaf.Domain;
using awqaf.Dto;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace awqaf.Application.Queries
{
    public class UserGetQueryHandler : IRequestHandler<UserGetQuery, UserDto>
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserGetQueryHandler(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<UserDto> Handle(UserGetQuery request, CancellationToken cancellationToken)
        {
            var result = await _userManager.Users
                .Where(user => user.Login == request.Login)
                .Include(it => it.UserRoles)
                .ThenInclude(r => r.Role)
                .SingleOrDefaultAsync();
            return _mapper.Map<UserDto>(result);
        }
    }
}
