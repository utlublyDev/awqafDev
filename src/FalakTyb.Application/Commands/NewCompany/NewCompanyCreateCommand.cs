
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NewCompanyCreateCommand : IRequest<NewCompany>
    {
        public NewCompany NewCompany { get; set; }
    }
}
