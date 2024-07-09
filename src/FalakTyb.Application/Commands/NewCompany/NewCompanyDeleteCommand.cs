using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NewCompanyDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
