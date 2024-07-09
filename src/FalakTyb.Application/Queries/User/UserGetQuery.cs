using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class UserGetQuery : IRequest<UserDto>
    {
        public string Login { get; set; }
    }
}
