
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NewCompanyUpdateCommand : IRequest<NewCompany>
    {
        public NewCompany NewCompany { get; set; }
    }
}
